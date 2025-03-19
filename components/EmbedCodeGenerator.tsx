'use client';

import React, { useState } from 'react';

interface EmbedCodeGeneratorProps {
  productId: string;
  baseUrl: string;
}

const EmbedCodeGenerator: React.FC<EmbedCodeGeneratorProps> = ({ productId, baseUrl }) => {
  const [copied, setCopied] = useState(false);
  
  const embedCode = `
  <div id="price-tester-widget-${productId}"></div>
<script src="${baseUrl}/widget.js"></script>
<script>
  initPriceTesterWidget({
    productId: "${productId}",
    containerId: "price-tester-widget-${productId}"
  });
</script>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Embed Widget Code</h2>
        <p className="text-sm mb-2">Copy this code and paste it into your website to embed the price tester widget.</p>
        
        <div className="mockup-code mb-4">
          <pre><code>{embedCode}</code></pre>
        </div>
        
        <button
          className={`btn ${copied ? 'btn-success' : 'btn-primary'}`}
          onClick={copyToClipboard}
        >
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </button>
      </div>
    </div>
  );
};

export default EmbedCodeGenerator;