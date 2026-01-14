import { BigInt, Bytes } from "@graphprotocol/graph-ts"
import { 
  ArticleRegistered, 
  AccessGranted, 
  Staked,
  Unstaked,       // <--- New Event
  RewardClaimed   // <--- New Event
} from "../generated/PennyPress/PennyPress"
import { Article, User, Stake, Purchase } from "../generated/schema"

// Helper function to load or create a User
function getOrCreateUser(address: Bytes): User {
  let user = User.load(address)
  if (!user) {
    user = new User(address)
    user.totalRevenue = BigInt.fromI32(0)
    user.totalStaked = BigInt.fromI32(0)
    user.save()
  }
  return user
}

export function handleArticleRegistered(event: ArticleRegistered): void {
  let article = new Article(event.params.articleId.toHexString())
  
  // 1. Create or Load the Creator (User)
  let creator = getOrCreateUser(event.params.creator)

  article.ipfsCid = event.params.ipfsCid
  article.price = event.params.price
  article.creator = event.params.creator
  article.creatorUser = creator.id // Link for the relationship
  article.totalStaked = BigInt.fromI32(0)
  article.createdAt = event.block.timestamp 
  article.reads = BigInt.fromI32(0)

  article.save()
}

export function handleAccessGranted(event: AccessGranted): void {
  let article = Article.load(event.params.articleId.toHexString())
  
  // 1. Create or Load the Buyer (User)
  let buyer = getOrCreateUser(event.params.user)

  if (article) {
    // Update Article stats
    article.reads = article.reads.plus(BigInt.fromI32(1))
    article.save()

    // Create Purchase Record
    // ID is unique per transaction + log index to avoid collisions
    let purchaseId = event.transaction.hash.toHexString() + "-" + event.logIndex.toString()
    let purchase = new Purchase(purchaseId)
    purchase.user = buyer.id
    purchase.article = article.id
    purchase.timestamp = event.block.timestamp
    purchase.save()
  }
}

export function handleStaked(event: Staked): void {
  let article = Article.load(event.params.articleId.toHexString())
  let user = getOrCreateUser(event.params.staker)

  if (article) {
    // 1. Update Article Total
    article.totalStaked = article.totalStaked.plus(event.params.amount)
    article.save()

    // 2. Update User Total
    user.totalStaked = user.totalStaked.plus(event.params.amount)
    user.save()

    // 3. Update or Create Specific Stake Entity
    // ID format: "userAddress-articleId"
    let stakeId = event.params.staker.toHexString() + "-" + event.params.articleId.toHexString()
    let stake = Stake.load(stakeId)

    if (!stake) {
      stake = new Stake(stakeId)
      stake.user = user.id
      stake.article = article.id
      stake.amount = BigInt.fromI32(0)
    }

    stake.amount = stake.amount.plus(event.params.amount)
    stake.save()
  }
}

export function handleUnstaked(event: Unstaked): void {
  let article = Article.load(event.params.articleId.toHexString())
  let user = getOrCreateUser(event.params.staker)

  if (article) {
    article.totalStaked = article.totalStaked.minus(event.params.amount)
    article.save()

    user.totalStaked = user.totalStaked.minus(event.params.amount)
    user.save()

    let stakeId = event.params.staker.toHexString() + "-" + event.params.articleId.toHexString()
    let stake = Stake.load(stakeId)

    if (stake) {
      stake.amount = stake.amount.minus(event.params.amount)
      // If stake drops to 0, we can either keep it at 0 or remove it. 
      // Keeping it at 0 preserves history.
      stake.save()
    }
  }
}

export function handleRewardClaimed(event: RewardClaimed): void {
  let user = getOrCreateUser(event.params.staker)
  
  // Simply add to their total lifetime revenue
  user.totalRevenue = user.totalRevenue.plus(event.params.amount)
  user.save()
}