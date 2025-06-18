import axios from "axios";


export const dynamic = 'force-dynamic';


export const GET = async (req,context ) => {
  
  try {
    const { params } = context;
    const productId = parseInt(params.id);
    
    const response = await axios.get(`http://localhost:8080/single-product/${productId}`);
    const data = response.data;

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Backend API fetch failed, serving local data instead:", error.message);
  }
};