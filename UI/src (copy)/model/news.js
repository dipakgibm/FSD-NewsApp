export class News {
  source = {
    id: null,
    name: null,
  };
  author;
  title;
  description;
  url;
  urlToImage;
  publishedAt;
  content;

  constructor(
    source,
    author,
    title,
    description,
    url,
    urlToImage,
    publishedAt,
    content
  ) {
    this.source = source;
    this.author = author;
    this.title = title;
    this.description = description;
    this.url = url;
    this.urlToImage = urlToImage;
    this.publishedAt = publishedAt;
    this.content = content;
  }
}
