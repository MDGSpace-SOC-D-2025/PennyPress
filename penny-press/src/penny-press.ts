import { ArticleRegistered, AccessGranted, Staked } from "../generated/PennyPress/PennyPress"
import { Article } from "../generated/schema"
import { BigInt } from "@graphprotocol/graph-ts"

export function handleArticleRegistered(event: ArticleRegistered): void {
  let article = new Article(event.params.articleId.toHexString())
  article.ipfsCid = event.params.ipfsCid
  article.price = event.params.price
  article.creator = event.params.creator
  article.ownerCount = 0
  article.createdAt = event.block.timestamp
  article.totalStaked = BigInt.fromI32(0)
  article.save()
}

export function handleAccessGranted(event: AccessGranted): void {
  let article = Article.load(event.params.articleId.toHexString())
  if (article) {
    article.ownerCount = article.ownerCount + 1
    article.save()
  }
  
}
export function handleStaked(event: Staked): void {
  let article = Article.load(event.params.articleId.toHexString())

  if (article) {
    article.totalStaked = article.totalStaked.plus(event.params.amount)
    article.save()
  }
}