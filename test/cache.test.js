const MemoryCachePlugin = require('../lib/cache')

const noop = () => { }

describe('Basic tests', () => {
  let ctx = null
  let plugin = null
  beforeEach(async () => {
    ctx = {
      state: { }
    }
    plugin = new MemoryCachePlugin()
  })
  it('should init the cache', async () => {
    await plugin.start(ctx, noop)
    expect(ctx.state.cache).toBeTruthy()
  })
  it('should perform basic cache operations', async () => {
    await plugin.start(ctx, noop)
    expect(await ctx.state.cache.get('KEY')).toBeFalsy()
    await ctx.state.cache.set('KEY', 'VALUE')
    expect(await ctx.state.cache.get('KEY', 'VALUE')).toEqual('VALUE')
    ctx.state.cache.del('KEY')
    expect(await ctx.state.cache.get('KEY')).toBeFalsy()
  })
})