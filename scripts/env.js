const fs = require('fs')
const { resolve } = require('path')
const dotenv = require('dotenv')

const dotenvTags = [
  // 本地环境
  'development',
  // 测试环境
  'test',
  // 正式环境
  'production'
]

if (!dotenvTags.includes(process.env.NODE_ENV)) {
  process.env.NODE_ENV = dotenvTags[0]
}
const dotenvPath = resolve('.env')

const dotenvFiles = [
  dotenvPath,
  `${dotenvPath}.local`,
  `${dotenvPath}.${process.env.NODE_ENV}`,
  `${dotenvPath}.${process.env.NODE_ENV}.local`
].filter(fs.existsSync)

dotenvFiles
  .reverse()
  .forEach(file => dotenv.config({ path: file }))
