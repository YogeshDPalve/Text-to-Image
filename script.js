const token = "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"
const inputTxt = document.getElementById("input");
const image = document.getElementById("image");
const button = document.getElementById("btn");



async function query(data) {
    try {
        image.src = "./loading.gif";
        const response = await fetch(
            "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
            {
                headers: { Authorization: `Bearer ${token}` },
                method: "POST",
                body: JSON.stringify({ "inputs": inputTxt.value }),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.blob();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

button.addEventListener("click", async function () {
    try {
        const response = await query();
        //* Use image
        const objectURL = URL.createObjectURL(response);
        image.src = objectURL;
    } catch (error) {
        console.error('Error in button click event:', error);
    }
});
