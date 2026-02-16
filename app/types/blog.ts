export type Blog = {
  id: string;
  title: string;
  crew?: string;
  suuji?: number;
  bounty?: number;
  eyecatch?: {
    url: string;
    height: number;
    width: number;
  };
  content?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  revisedAt?: string;
};
