import { ref } from 'vue';
import router from '../router'
import useBase from './base';

export default () =>{

    const { ElMessage } = useBase()

    // 重定向路由
    const query = (router.currentRoute.value.query?.redirect || '/') as string
    const redirect = decodeURIComponent(query)

    const form = ref({username: '', password: ''})
    const isShowPwd = ref(false)
    let loading = ref(false)
    const rules = {
        username: [
            { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 32, message: '密码长度为6-32位', trigger: 'blur' }
        ]
    }
    const ruleFromRef = ref()

    // 登录
    const handleLogin = () => {
        ruleFromRef.value.validate((valid: boolean) => {
            if (!valid) {
                return
            }

            loading.value = true;
            setTimeout(() => {
                loading.value = false
                sessionStorage.setItem('userInfo','test')
                ElMessage.success("登录成功")
                router.push({path: redirect})
            }, 1500)
        })
    }

    return {
        form,
        rules,
        isShowPwd,
        loading,
        handleLogin,
        ruleFromRef
    }
}