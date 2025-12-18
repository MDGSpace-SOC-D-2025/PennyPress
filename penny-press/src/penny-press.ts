import { ArticleRegistered, AccessGranted } from "../generated/PennyPress/PennyPress"
import { Article } from "../generated/schema"

export function handleArticleRegistered(event: ArticleRegistered): void {
  let article = new Article(event.params.articleId.toHexString())
  article.ipfsCid = event.params.ipfsCid
  article.price = event.params.price
  article.creator = event.params.creator
  article.ownerCount = 0
  article.createdAt = event.block.timestamp
  article.save()
}

export function handleAccessGranted(event: AccessGranted): void {
  let article = Article.load(event.params.articleId.toHexString())
  if (article) {
    article.ownerCount = article.ownerCount + 1
    article.save()
  }
}