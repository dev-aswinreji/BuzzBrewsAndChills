import sharp from 'sharp'

export async function validateImage(filename) {
    try {
        // Read the image file and get its metadata
        const metadata = await sharp(filename).metadata();

        // Validate based on metadata, you can add more checks if needed
        if (metadata.format && metadata.width && metadata.height) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error validating image:', error);
        return false;
    }
}
