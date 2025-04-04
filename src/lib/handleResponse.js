const handleResponse = async (res) => {
	let data;
	try {
		data = await res.json();
	} catch (error) {
		throw new Error(`Invalid response from server. Status: ${res.status}`);
	}

	if (!res.ok) {
		throw new Error(data.error || `HTTP error! Status: ${res.status}`);
	}

	return data;
};

export { handleResponse };
