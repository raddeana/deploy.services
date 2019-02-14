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

        const { repository, release } = data

        this.data = {
            url: release.url,
            tag_name: release.tag_name,
            repository: repository.name,
            published_at: release.published_at
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
