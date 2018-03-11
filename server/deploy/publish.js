/**
 * 一些配置
 * @author tmuffin
 */

const shelljs = require('shelljs/global')
const qn = require('qn')
const fs = require('fs')
const path = require('path')
const qniu = require('../config/qniu')

const { accessKey, secretKey, getBucket, getDomain } = qniu

/**
 * 发布
 * @return 
 */
module.exports = (configure) => {
  const bucket = getBucket(configure.project)
  const origin = getDomain(configure.project)

  const client = qn.create({
    accessKey,
    secretKey,
    bucket,
    origin,
  })

  ergodicUpload(configure.projectPath + '/production', null, clinet)
}

/**
 * 遍历上传
 */
function ergodicUpload (prodPath, folderPath, clinet) {
  folderPath = folderPath || prodPath

  fs.readdir(folderPath, function (err, files) {  
    if(err){  
      console.error(err)  
    } else {  
      files.forEach(function (filename) {
        const filedir = path.join(folderPath, filename)

        fs.stat(filedir, function (eror, stats) {
          if (eror) {
            console.error('获取文件stats失败')
          } else {  
            const isFile = stats.isFile()
            const isDir = stats.isDirectory()

            if (isFile){
              const key = filedir.replace(prodPath, '')
              const filepath = folderPath + filename

              // upload a file with custom key 
              client.uploadFile(filepath, { key, }, function (err, result) {
                if (err) {
                  console.error(error)
                }

                console.info("publish\t" + filename + "\tsuccess")
              })
            }

            if (isDir) {
              fileDisplay(filedir, clinet)
            }
          }
        })
      })
    }
  })
}