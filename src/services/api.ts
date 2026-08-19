const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export async function mockFetch<T>(data: T, ms = 300): Promise<T> {
  await delay(ms);
  return data;
}
