// Customer Func
export function fetchCustomer() {
  return fetch(import.meta.env.VITE_CUSTOMER_API_URL).then((response) => {
    if (!response.ok) throw new Error("Error in fetch: " + response.statusText);

    return response.json();
  });
}

export function saveCustomer(newCustomer) {
  return fetch(import.meta.env.VITE_CUSTOMER_API_URL, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(newCustomer),
  }).then((response) => {
    if (!response.ok)
      throw new Error("Error in saving: " + response.statusText);

    return response.json();
  });
}

export function deleteCustomer(url) {
  return fetch(url, { method: "DELETE" }).then((response) => {
    if (!response.ok)
      throw new Error("Error in delete: " + response.statusText);

    return response.json();
  });
}

// Training Func
export function fetchTraining() {
  return fetch(import.meta.env.VITE_TRAINING_API_URL).then((response) => {
    if (!response.ok) throw new Error("Error in fetch: " + response.statusText);

    return response.json();
  });
}
