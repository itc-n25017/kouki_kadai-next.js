export type Blog = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  crew?: string;
  bounty?: string;
  eyecatch?: {
    url: string;
    height: number;
    width: number;
  };
};
