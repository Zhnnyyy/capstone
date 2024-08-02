export const Fetch = (url, method, response, data) => {
  response({ loading: true });
  fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Status != 200");
      }
      return response.text();
    })
    .then((result) => {
      response({ loading: false, data: result });
    })
    .catch((err) => {
      console.error(err);
    });
};

// fetch("http://192.168.254.131/imove/api/showEmployee.php", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.text(); // Get response body as text
//     })
//     .then((text) => {
//       console.log("Response body:", text); // Log response body for inspection
//       try {
//         const data = JSON.parse(text); // Attempt to parse response text as JSON
//         console.log("Parsed JSON:", data); // Output the parsed JSON data
//       } catch (error) {
//         console.error("Error parsing JSON:", error);
//       }
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
