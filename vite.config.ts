import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // 개발 서버에 대한 자세한 로깅 활성화
    strictPort: true, // 지정한 포트가 사용 중이면 서버 시작 실패
    hmr: {
      // HMR 연결에 사용되는 포트 (프록시 뒤에서 실행 중인 경우 유용)
      port: 3001,
      // 네트워크를 통한 HMR 활성화 (다른 기기에서 접근 시)
      host: 'localhost'
    },
    // 로컬 네트워크 호스트를 통해 접근 가능하도록 설정
    host: true,
    proxy: {
      '/socket.io': {
        target: 'ws://localhost:1337',
        ws: true,
        changeOrigin: true, // 호스트 헤더를 target URL에 맞춰 변경
        rewrite: (path) => path.replace(/^\/api/, '') // '/api' 경로를 제거
      }
    }
  }

  // server: {
  //   proxy: {
  //     // API 요청을 위한 프록시 설정
  //     '/sockjs-node': {
  //       target: 'http://localhost:3000', // 타겟 서버 주소
  //       changeOrigin: true, // 도메인이 다른 경우 필요
  //       ws: true, // 웹소켓 요청도 프록시
  //       secure: false, // https 사용 시 인증서 오류를 무시
  //       headers: {
  //         // 필요한 경우 추가 헤더 설정
  //         'Access-Control-Allow-Origin': 'http://localhost:5173'
  //       }
  //     }
  //   }
  // }
})
