   addEventListener('fetch', event => {
       event.respondWith(handleRequest(event.request));
   });

   async function handleRequest(request) {
       if (request.method === 'POST' && request.url.endsWith('/api/submit')) {
           const formData = await request.formData();
           
           // Log the form data to the console
           const data = {};
           formData.forEach((value, key) => {
               data[key] = value;
           });
           console.log('Received form data:', data);

           return new Response('Data received', {
               status: 200,
               headers: {
                   'Access-Control-Allow-Origin': '*',
                   'Access-Control-Allow-Methods': 'POST',
                   'Access-Control-Allow-Headers': 'Content-Type'
               }
           });
       }
       return new Response('Method not allowed', { status: 405 });
   }
   
