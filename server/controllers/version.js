/**
 * 版本控制
 * @author chenxiangyu
 */
 
/**
* 版本回滚
* @Controller
*/
module.exports.rollBack = (req, res) => {
  const { projectId, version } = res.body
}

/**
 * 删除版本
 * @Controller
 */
module.exports.delete = (req, res) => {
  const { projectId, version } = res.body
}
