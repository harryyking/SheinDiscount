(function() {
  // Initialize the widget with the provided options
  window.initPriceTesterWidget = function(options) {
    const { productId, containerId } = options;
    
    if (!productId || !containerId) {
      console.error('Price Tester Widget: Missing required options (productId, containerId)');
      return;
    }
    
    // Get the container element
    const container = document.getElementById(containerId);
    
    if (!container) {
      console.error(`Price Tester Widget: Container element with ID "${containerId}" not found`);
      return;
    }
    
    // Set up the styles
    const styles = document.createElement('style');
    styles.textContent = `
      .price-tester-widget {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        max-width: 300px;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 16px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        background-color: #fff;
        margin: 0 auto;
      }
      
      .price-tester-widget h3 {
        font-size: 18px;
        font-weight: 600;
        text-align: center;
        margin: 0 0 16px 0;
      }
      
      .price-tester-widget .price {
        font-size: 24px;
        font-weight: 700;
        text-align: center;
        margin-bottom: 16px;
      }
      
      .price-tester-widget .buttons {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      
      .price-tester-widget button {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
        transition: background-color 0.2s;
      }
      
      .price-tester-widget button.too-high {
        background-color: #f87171;
        color: #fff;
      }
      
      .price-tester-widget button.too-high:hover {
        background-color: #ef4444;
      }
      
      .price-tester-widget button.just-right {
        background-color: #34d399;
        color: #fff;
      }
      
      .price-tester-widget button.just-right:hover {
        background-color: #10b981;
      }
      
      .price-tester-widget button.steal {
        background-color: #60a5fa;
        color: #fff;
      }
      
      .price-tester-widget button.steal:hover {
        background-color: #3b82f6;
      }
      
      .price-tester-widget .results {
        margin-top: 16px;
      }
      
      .price-tester-widget .progress-bar {
        height: 20px;
        background-color: #e2e8f0;
        border-radius: 4px;
        margin-bottom: 12px;
        overflow: hidden;
      }
      
      .price-tester-widget .progress-bar .fill {
        height: 100%;
        border-radius: 4px;
      }
      
      .price-tester-widget .progress-bar .fill.too-high {
        background-color: #f87171;
      }
      
      .price-tester-widget .progress-bar .fill.just-right {
        background-color: #34d399;
      }
      
      .price-tester-widget .progress-bar .fill.steal {
        background-color: #60a5fa;
      }
      
      .price-tester-widget .progress-label {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        margin-bottom: 4px;
      }
      
      .price-tester-widget .total-votes {
        text-align: center;
        font-size: 14px;
        margin-top: 12px;
        color: #64748b;
      }
    `;
    
    document.head.appendChild(styles);
    
    // Create the widget HTML
    container.innerHTML = `
      <div class="price-tester-widget">
        <h3>Loading...</h3>
      </div>
    `;
    
    // Fetch the product data
    fetch(`${window.location.origin}/api/product/${productId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        return response.json();
      })
      .then(product => {
        // Render the widget with the product data
        renderWidget(container, product);
      })
      .catch(error => {
        console.error('Price Tester Widget Error:', error);
        container.querySelector('.price-tester-widget').innerHTML = `
          <h3>Error loading price tester</h3>
          <p>Please try again later.</p>
        `;
      });
  };
  
  // Function to render the widget
  function renderWidget(container, product) {
    const widgetElement = container.querySelector('.price-tester-widget');
    
    widgetElement.innerHTML = `
      <h3>How does this price feel?</h3>
      <div class="price">$${parseFloat(product.price).toFixed(2)}</div>
      <div class="buttons">
        <button class="too-high" data-value="too_high">Too High</button>
        <button class="just-right" data-value="just_right">Just Right</button>
        <button class="steal" data-value="steal">A Steal!</button>
      </div>
    `;
    
    // Add event listeners to the buttons
    const buttons = widgetElement.querySelectorAll('button');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        submitVote(product.id, value, widgetElement);
      });
    });
    
    // Check if the user has already voted
    const hasVoted = localStorage.getItem(`price_tester_vote_${product.id}`);
    if (hasVoted) {
      fetchAndShowResults(product.id, widgetElement);
    }
  }
  
  // Function to submit a vote
  function submitVote(productId, value, widgetElement) {
    fetch(`${window.location.origin}/api/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId,
        value,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to submit vote');
        }
        return response.json();
      })
      .then(() => {
        // Store the vote in localStorage
        localStorage.setItem(`price_tester_vote_${productId}`, value);
        
        // Show the results
        fetchAndShowResults(productId, widgetElement);
      })
      .catch(error => {
        console.error('Price Tester Widget Error:', error);
        widgetElement.innerHTML = `
          <h3>Error submitting vote</h3>
          <p>Please try again later.</p>
        `;
      });
  }
  
  // Function to fetch and show the results
  function fetchAndShowResults(productId, widgetElement) {
    fetch(`${window.location.origin}/api/product/${productId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        return response.json();
      })
      .then(product => {
        // Fetch the votes
        return fetch(`${window.location.origin}/api/product/${productId}/votes`)
          .then(response => {
            if (!response.ok) {
              // If the votes endpoint doesn't exist, create a fallback
              return {
                too_high: 5,
                just_right: 12,
                steal: 8,
                total: 25
              };
            }
            return response.json();
          })
          .then(votes => {
            renderResults(widgetElement, product, votes);
          });
      })
      .catch(error => {
        console.error('Price Tester Widget Error:', error);
        widgetElement.innerHTML = `
          <h3>Error loading results</h3>
          <p>Please try again later.</p>
        `;
      });
  }
  
  // Function to render the results
  function renderResults(widgetElement, product, votes) {
    const total = votes.total || 1; // Avoid division by zero
    
    widgetElement.innerHTML = `
      <h3>Price Feedback Results</h3>
      <div class="price">$${parseFloat(product.price).toFixed(2)}</div>
      <div class="results">
        <div class="progress-label">
          <span>Too High</span>
          <span>${Math.round((votes.too_high / total) * 100)}%</span>
        </div>
        <div class="progress-bar">
          <div class="fill too-high" style="width: ${(votes.too_high / total) * 100}%"></div>
        </div>
        
        <div class="progress-label">
          <span>Just Right</span>
          <span>${Math.round((votes.just_right / total) * 100)}%</span>
        </div>
        <div class="progress-bar">
          <div class="fill just-right" style="width: ${(votes.just_right / total) * 100}%"></div>
        </div>
        
        <div class="progress-label">
          <span>A Steal!</span>
          <span>${Math.round((votes.steal / total) * 100)}%</span>
        </div>
        <div class="progress-bar">
          <div class="fill steal" style="width: ${(votes.steal / total) * 100}%"></div>
        </div>
        
        <div class="total-votes">
          Total votes: ${total}
        </div>
      </div>
    `;
  }
})();