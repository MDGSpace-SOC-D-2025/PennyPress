import { BigInt } from "@graphprotocol/graph-ts"
import { 
  ArticleRegistered, 
  AccessGranted, 
  Staked 
} from "../generated/PennyPress/PennyPress"
import { Article } from "../generated/schema"

export function handleArticleRegistered(event: ArticleRegistered): void {
  // 1. Create the new Article entity
  let entity = new Article(event.params.articleId.toHexString())

  entity.ipfsCid = event.params.ipfsCid
  entity.price = event.params.price
  entity.creator = event.params.creator
  entity.totalStaked = BigInt.fromI32(0)
  entity.createdAt = event.block.timestamp 
  
  entity.reads = BigInt.fromI32(0)

  // 4. Save
  entity.save()
}

export function handleAccessGranted(event: AccessGranted): void {
  let article = Article.load(event.params.articleId.toHexString())

  if (article) {
    article.reads = article.reads.plus(BigInt.fromI32(1))
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