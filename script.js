document.getElementById('submit-btn').addEventListener('click', async () => {
    const jsonInput = document.getElementById('json-input').value;
    const filterDropdown = document.getElementById('filter-dropdown');
    const selectedOptions = Array.from(filterDropdown.selectedOptions).map(option => option.value);
    const errorMessage = document.getElementById('error-message');
    const responseOutput = document.getElementById('response-output');

    errorMessage.textContent = '';
    responseOutput.textContent = '';

    try {
        JSON.parse(jsonInput); // Validate JSON format

        // Mock API call for demonstration
        const mockResponse = await mockApiCall(JSON.parse(jsonInput));

        // Filter the response data based on selected options
        const filteredData = filterData(mockResponse, selectedOptions);
        responseOutput.textContent = JSON.stringify(filteredData, null, 2);
    } catch (error) {
        errorMessage.textContent = 'Invalid JSON format or API call failed';
    }
});

function filterData(data, selectedOptions) {
    const result = {};

    if (selectedOptions.includes('alphabets')) {
        result.alphabets = data.data.filter(item => isNaN(item));
    }
    if (selectedOptions.includes('numbers')) {
        result.numbers = data.data.filter(item => !isNaN(item));
    }
    if (selectedOptions.includes('highest_lowercase')) {
        const lowercase = data.data.filter(item => /^[a-z]$/.test(item));
        if (lowercase.length > 0) {
            result.highest_lowercase = lowercase.reduce((a, b) => (a > b ? a : b));
        }
    }

    return result;
}

// Mock API function
async function mockApiCall(inputData) {
    // Simulate a delay to mimic API response time
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock response data
    return {
        data: inputData.data
    };
}
