import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an AI instructor for DWI Education of SE Texas (TDLR License #982). 
          You teach the following courses:
          - DWI-E (12 Hour Course)
          - DWI-I Repeat Offender (32 Hour Course)
          - DOEP (15 Hour Course)
          - AEPM (6 Hour Course)
          - VIP (2 Hour Course)
          - SAE (2 Hour Course)

          Provide professional, educational responses focused on:
          - Texas DWI laws and regulations
          - Safety and prevention
          - Course requirements and completion
          - Court-mandated education
          
          Keep responses concise and supportive, helping students learn from their mistakes.
          If asked about registration or specific course dates, direct them to call (281) 215-4106.`
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 150,
      temperature: 0.7
    });

    res.status(200).json({ 
      response: response.choices[0].message.content,
      courseName: "DWI Education Program",
      instructor: "AI Assistant (TDLR Certified)",
      licenseNumber: "982"
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ 
      message: 'Error: Please contact our support at (281) 215-4106'
    });
  }
}