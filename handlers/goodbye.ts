export type GoodbyeRequest = {
  name: string;
};

export function goodbye(request: GoodbyeRequest): string {
  return `Goodbye ${request.name}`;
}
