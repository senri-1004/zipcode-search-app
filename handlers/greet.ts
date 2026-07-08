export type GreetRequest = {
  name: string;
};

export function greet(request: GreetRequest): string {
  return `Hello ${request.name}`;
}
