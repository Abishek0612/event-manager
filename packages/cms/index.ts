const mockPost = {
  _title: "Sample Blog Post",
  _slug: "sample-post",
  description: "This is a sample blog post description",
  date: new Date().toISOString(),
  image: {
    url: "/placeholder.jpg",
    alt: "Sample image",
    width: 800,
    height: 400,
  },
  body: {
    json: {
      content: [],
      toc: [],
    },
    readingTime: 5,
  },
  authors: [
    {
      _title: "Sample Author",
    },
  ],
};

const mockLegalPost = {
  _title: "Privacy Policy",
  _slug: "privacy",
  description: "Our privacy policy",
  body: {
    json: {
      content: [],
      toc: [],
    },
    readingTime: 3,
  },
};

export const blog = {
  getPosts: async () => [mockPost],
  getPost: async (slug: string) => (slug ? mockPost : null),
  postsQuery: {
    blog: {
      posts: {
        items: [mockPost],
        item: mockPost,
      },
    },
  },
  postQuery: (slug: string) => ({
    blog: {
      posts: {
        item: slug ? mockPost : null,
      },
    },
  }),
  latestPostQuery: {
    blog: {
      posts: {
        item: mockPost,
      },
    },
  },
};

export const legal = {
  getPosts: async () => [mockLegalPost],
  getPost: async (slug: string) => (slug ? mockLegalPost : null),
  postsQuery: {
    legalPages: {
      items: [mockLegalPost],
      item: mockLegalPost,
    },
  },
  postQuery: (slug: string) => ({
    legalPages: {
      item: slug ? mockLegalPost : null,
    },
  }),
};

export const basehub = null;
export const fragmentOn = () => ({});
