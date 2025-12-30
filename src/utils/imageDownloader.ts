// Google Drive folder ID from the shared link
const GOOGLE_DRIVE_FOLDER_ID = '1tz2roZaVb2EYAGEYqDvIWN2RAman5YQI';

export async function getGoogleDriveImages(): Promise<string[]> {
    try {
        const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

        if (!apiKey) {
            console.warn('Google API key not found.');
            return [];
        }

        // Fetch file list from Google Drive API
        const response = await fetch(
            `https://www.googleapis.com/drive/v3/files?q='${GOOGLE_DRIVE_FOLDER_ID}'+in+parents&fields=files(id,name,mimeType)&key=${apiKey}`
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Google Drive API Error:', errorText);
            throw new Error(`Failed to fetch images: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.files) {
            console.warn('No files found in response');
            return [];
        }

        // Filter valid images and map to direct view URLs
        // data.files already contains the list of files
        const imageUrls = data.files
            .filter((file: any) => file.mimeType && file.mimeType.startsWith('image/'))
            .map((file: any) => `https://drive.google.com/thumbnail?id=${file.id}&sz=w2000`);
        // data.files already contains the list of files

        console.log(`Found ${imageUrls.length} images from Google Drive`);
        return imageUrls;

    } catch (error) {
        console.error('Error in getGoogleDriveImages:', error);
        return [];
    }
}

