    import { NextResponse } from "next/server";
    import { v2 as cloudinary } from 'cloudinary';



        // Configuration
        cloudinary.config({ 
            cloud_name: 'dwpi4aubh', 
            api_key: '511943635981393', 
            api_secret: 'YruyI5Vve2kpNP7t2TMcyrvSVaw' 
        });
        //Eliminat 
        export async function DELETE(request) {
            try {
              const data = await request.json();
              const { public_id } = data;
          
              if (!public_id) {
                return NextResponse.json({ error: 'Image ID is required' }, { status: 400 });
              }
          
              await cloudinary.uploader.destroy(public_id);
          
              return NextResponse.json({ message: 'Image deleted successfully' });
            } catch (error) {
              console.error('Error deleting image:', error);
              return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
            }
          }

        //ACTUALIZAR
        export async function PUT(request) {
            const data = await request.formData();
            const image = data.get("imageUpdate")

            const publicId = data.get('public_id')
        
            if (!image || !publicId) {
                return NextResponse.json('No se pudo actualizar la imagen',{status: 400})
            }

            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);

            try{
                //eliminar la imagen anterior
                await cloudinary.uploader.destroy(publicId)

                //subir nueva imagen
                const response = await new Promise((resolve, reject)=>{
                    cloudinary.uploader.upload_stream({public_id: publicId}, (err, result)=>{
                        if (err) {
                            reject(err);
                        }
                        resolve(result);
                    }).end(buffer);
                });
                return NextResponse.json(
                    {message: 'Imagen Actualizada',
                        url: response.secure_url,
                    })
                    }
            catch(error){
                return NextResponse.json('No se pudo actualizar',{status: 500});
            }
        }

        //AGREGAR
        export async function POST(request) {
          try {
            const data = await request.formData();
            const image = data.get("imageAgregar");
            const publicId = data.get("public_id");
        
            if (!image) {
              return NextResponse.json({ message: "Image not found" }, { status: 400 });
            }
        
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);
        
            const response = await new Promise((resolve, reject) => {
              cloudinary.uploader.upload_stream(
                { public_id: publicId },
                (err, result) => {
                  if (err) {
                    reject(err);
                  }
                  resolve(result);
                }
              ).end(buffer);
            });
        
            console.log(response);
        
            return NextResponse.json({
              message: "Image uploaded",
              url: response.secure_url,
              public_id: response.public_id
            });
          } catch (error) {
            console.error("Error uploading image:", error);
            return NextResponse.json({ message: "Error uploading image" }, { status: 500 });
          }
        }