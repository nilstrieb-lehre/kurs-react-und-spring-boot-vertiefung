export type ShoppingList = {
  name: string;
  id: string;
  products: Product[];
};

export type Product = {
  id: string;
  name: string;
  requester: string;
  location: string;
  quantity: string;
  completed: boolean;
};

async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`http://localhost:8080${path}`, options);
  if (!res.ok) {
    throw Error(await res.text());
  }
  return res.json();
}

export class FetchError {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

export async function getList(
  id: string
): Promise<ShoppingList | null> {
  const res = await fetch(
    `http://localhost:8080/shopping-list/${encodeURIComponent(id)}`
  );
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return await res.json();
}

export async function createList(name: string): Promise<ShoppingList> {
  const list: ShoppingList = { id: "", name, products: [] };
  return fetchApi(`/shopping-list`, {
    method: "POST",
    body: JSON.stringify(list),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function addProduct(
  id: string,
  product: Product
): Promise<ShoppingList> {
  return fetchApi(`/shopping-list/${encodeURIComponent(id)}`, {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function editProduct(
  id: string,
  product: Product
): Promise<ShoppingList> {
  return fetchApi(
    `/shopping-list/${encodeURIComponent(id)}/${encodeURIComponent(
      product.id
    )}`,
    {
      method: "PUT",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function deleteProduct(
  id: string,
  product: string
): Promise<ShoppingList> {
  return fetchApi(
    `/shopping-list/${encodeURIComponent(id)}/${encodeURIComponent(product)}`,
    {
      method: "DELETE",
    }
  );
}
