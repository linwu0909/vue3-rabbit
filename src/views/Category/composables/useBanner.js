import { getBannerAPI } from '@/api/home'
import { onMounted, ref } from 'vue'
export function useBanner() {
  // 获取banner
  const bannerList = ref([])

  const getBanner = async () => {
    const res = await getBannerAPI({
      distributionSite: '2'
    })
    console.log(res)
    debugger
    bannerList.value = res.result
  }

  onMounted(() => getBanner())
  return {
    bannerList
  }
}
