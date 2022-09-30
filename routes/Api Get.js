const { fs, router } = require('../Module/index')

module.exports.load = async => {
    fs.readdirSync(`../api/src/`).forEach(async dir1 => {
        const f = fs.readdirSync(`../api/src/${dir1}`)
        console.log(`\n=========================== ${dir1} API 호출중 ===========================\n`);
        console.log(`Load API : ${f.length}개`)
        fs.readdirSync(`../api/src/${dir1}`).forEach(async dir2 => {
            const apiFiles = fs.readdirSync(`../api/src/${dir1}/${dir2}/`).filter(file => file.endsWith('.js'));
            apiFiles.forEach(async file => {
                const apicode = require(`../src/${dir1}/${dir2}/${file}`)
                console.log(`Load API Info : ${apicode.nickname} | ${apicode.description}`);
                router.get(`/${apicode.version}/${apicode.name}`, async (req, res) => {
                    const date = new Date()
                    const time = Math.round(date.getTime() / 1000)
                    try {
                        await apicode.run(req, res, time)
                    } catch (err) {
                        try {
                            res.status(405).json({
                                status: 405,
                                messagen: `An error has occurred.`,
                            })
                        } catch (err) { }
                        console.log(err)
                    }
                })
            })
        })
    })
    console.log(`============================================================================`);
}