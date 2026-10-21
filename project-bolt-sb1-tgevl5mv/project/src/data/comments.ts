export interface Comment {
  id: string;
  destinationId: string;
  name: string;
  text: string;
  rating: number;
  createdAt: number;
}

export interface CommentResult {
  success: boolean;
  message: string;
}
