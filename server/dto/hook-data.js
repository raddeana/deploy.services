/**
 * 解析过的 git hook 数据
 * @author Philip
 */

class HookData {
    /**
     * 构造函数
     * @Contrutor
     */
    constructor (data) {
        if (typeof data === 'string') {
            try {
                data = JSON.parse(data)
            } catch (e) {
                throw(e)
            }
        }

        let { repository, release, action } = data
        let { name } = repository
        let { url, tag_name, published_at } = release
        

        this.data = {
            action,
            name: name.replace('blog.', '').replace('.web', ''),
            url: url,
            tag_name: tag_name,
            repository: name,
            published_at: published_at
        }
    }

    /**
     * 获取
     * @return {object} 
     */
    get () {
        return this.data
    }
    
    /**
     * 设置
     * @param {string} 
     * @param {string} 
     * @return none
     */
    set (key, value) {
        this.data[key] = value
    }
}

module.exports = HookData
