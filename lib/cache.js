class MemoryCachePlugin {

  constructor() {
    this.cache = new Cache()
  }

  async start(ctx, next) {
    if (!ctx.state.cache) {
      ctx.state.cache = this.cache
    }
    await next()
  }

  async request(ctx, next) {
    await this.start(ctx, next)
  }

  async teardown() {
    this.cache = null
  }
}

class Cache {
  constructor(data) {
    this.data = data || { }
  }

  get(key) {
    return this.data[key]
  }

  set(key, value) {
    this.data[key] = value
  }

  del(key) {
    return delete this.data[key]
  }
}

module.exports = MemoryCachePlugin