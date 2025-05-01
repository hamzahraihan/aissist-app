// import Cloudflare from 'cloudflare';

// const client = new Cloudflare({
//   apiToken: process.env.EXPO_PUBLIC_CLOUDFLARE_API_TOKEN,
//   apiKey: process.env.EXPO_PUBLIC_CLOUDFLARE_API_KEY,
// });

export async function POST(req: Request) {
  const { prompt, modelName }: { prompt: string; modelName: string } = await req.json();
  console.log(prompt);

  if (!prompt) {
    return new Response('No prompt provided', { status: 400 });
  }

  try {
    console.log(`generating image with ${modelName}`);

    const response = await fetch(process.env.EXPO_PUBLIC_CLOUDFLARE_BASE_URL + '/generate-image' || '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model: modelName, prompt }),
    });

    return Response.json(await response.json(), {
      headers: {
        'Content-Type': 'image/png',
      },
    });
    // const response = await client.ai.run(modelName, {
    //   account_id: '9b37eea8034fbf61191d273e000f450e',
    //   prompt: prompt || 'cyberpunk cat',
    // });

    // console.log(response);
    // return Response.json(response, {
    //   headers: {
    //     'Content-Type': 'image/png',
    //   },
    // });
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
}
