<template>
    <div class="errPage-container">
        <div>
            <p>
                <img :src="errGifUrl" class="some-gif" alt="Girl has dropped her ice cream." />
            </p>
            <p class="text">
                您没有权限访问该页面，
                <router-link to="/"> 返回首页</router-link>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
    import errGif from '../../assets/401.gif';

	export default defineComponent({
		name: "401",
		setup() {

            const errGifUrl = errGif + '?' + new Date();

			return {
				errGifUrl
			}
		}
	});
</script>

<style lang="scss" scoped>
.errPage-container {
    background: #fff;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .back-btn {
        background: #008489;
        color: #fff;
        border: none !important;
    }
    h2, p {
        text-align: center;
    }
    .text {
        font-weight: bold;
        a {
            font-weight: normal;
            color: #008489;
            text-decoration: none;
            &:hover {
                text-decoration: underline;
            }
        }
    }
}
</style>
