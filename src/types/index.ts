export type timestamp = string
export type Array = []
export interface User{
  id: string
  user_name: string
  password: string
  email: string
  phone_number: string
  last_visit_at: timestamp
  registered_at: timestamp
  concerned_games:Array
  avater: string
  bio: string
  posts: Array
  score: number
  is_admin: boolean
  threads: Array
  followers: Array
  is_tourist: boolean
  complaints:Array
}

export interface Thread{
  id: string
  last_postId: string
  userId: string
  first_postId: string

  forumId: string
  last_post_at: timestamp
  published_at: timestamp
  slug: string
  title: string
  posts: Array
  contributors: Array
}


export interface Post{
  id: string
  edited: string
  publishedAt: timestamp
  content: string
  threadId: string
  userId: string
  replies: Array
  likes: Array
}

export interface Log{
  id: string
  at: timestamp
  by: string
  moderated: boolean
}

export interface Forum{
  id: string
  last_postId: string
  slug: string
  threads: Array
  categoryId: string
  gameId: string
  posts: Array
}

export interface Game{
  id: string
  bg_images: string
  images: Array
  videos: Array
  name: string
  description: string
  people_and_network: string
  developer: string
  publisher: string
  lang: Array
  followers:Array
  platforms: Array
  tags: Array
  item_provider: Array
  evaluations: Array
}

export interface Platform{
  id: string
  name: string
}
export interface Tag{
  id: string
  name: string
}

export interface Evaluation{
  id: string
  postId: string
  star: number,
  hours:number,
  gameId:string,
}

export interface Category{
  id: string
  name: string
  slug: string
  forums: Array
}

export interface Complaint{
  id: string
  userId: string
  postId: string
  reason: string
  comfirmed_by: string
  comfirmed_at: timestamp
  status: string
}

export interface Task{
  userId: String
  checkInData: Array[]
  points: number
}
export interface timeItem{
  time: string
  amount:number
}
