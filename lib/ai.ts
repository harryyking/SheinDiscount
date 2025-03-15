import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

// Centralize the OpenAI model for reuse across functions
const model = openai('gpt-3.5-turbo');

// Generate Lesson
export async function generateLesson(topic: string): Promise<string> {
  const prompt = `Generate a short, engaging, and informative micro-learning lesson about ${topic}. 
    The content should be 50-100 words, easily digestible via WhatsApp, and end with a thought-provoking statement.
    Format it plainly without markdown or special formatting.`;

  try {
    const { text } = await generateText({
      model,
      prompt,
    });
    return text;
  } catch (error) {
    console.error(`Error generating lesson for topic: ${topic}`, error);
    return 'An error occurred while generating the lesson.';
  }
}

// Generate Quiz
export async function generateQuiz(topic: string): Promise<string> {
  const prompt = `Generate a single thought-provoking quiz question related to ${topic}. 
  Make it challenging but not impossible. Include the correct answer after the question.
  Format: [Question] followed by [Answer: correct_answer]`;

  try {
    const { text } = await generateText({
      model,
      messages: [
        {
          role: 'system',
          content: 'You are an expert educator who creates engaging quiz questions for learning.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      maxTokens: 150,
    });
    return text;
  } catch (error) {
    console.error(`Error generating quiz for topic: ${topic}`, error);
    return 'An error occurred while generating the quiz.';
  }
}

// Generate Reply
export async function generateReply(topic: string, userQuestion: string): Promise<string> {
  const prompt = `The user is learning about ${topic} and has asked: "${userQuestion}". 
  Provide a helpful, concise response (max 100 words) that directly answers their question.`;

  try {
    const { text } = await generateText({
      model,
      messages: [
        {
          role: 'system',
          content: 'You are an expert educator who provides concise, helpful answers to questions about various topics.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      maxTokens: 200,
    });
    return text;
  } catch (error) {
    console.error(`Error generating reply for topic: ${topic}, question: ${userQuestion}`, error);
    return 'An error occurred while generating the reply.';
  }
}