import type { Invitation } from '../types'
import { StorageManager } from '../storage'

declare global {
  interface Window {
    naver: any
  }
}

interface PreviewPageOptions {
  invitation: Invitation
  onBack: () => void
}

export class PreviewPage {
  private options: PreviewPageOptions

  constructor(options: PreviewPageOptions) {
    this.options = options
  }

  render(container: HTMLElement): void {
    const { invitation } = this.options
    const dateObj = new Date(invitation.date)
    const dayOfMonth = dateObj.getDate()
    const monthYear = this.formatMonthYear(dateObj)

    container.innerHTML = `
      <div class="page preview-page">
        <header class="app-header">
          <button id="btn-back" class="btn-back">← 뒤로</button>
          <h2>미리보기</h2>
          <div style="width: 50px;"></div>
        </header>

        <div class="mobile-frame">
          <div class="mobile-content ${invitation.template}" style="--primary-color: ${invitation.primaryColor}; --secondary-color: ${invitation.secondaryColor};">
            <!-- 헤더 -->
            <div class="invitation-header">
              ${invitation.mainImage ? `<img class="header-bg" src="${invitation.mainImage}" alt="대표사진" />` : ''}
              <div class="header-overlay"></div>
              <div class="header-content">
                <p class="subtitle">We are getting married</p>
                <h1>${invitation.groomName} <span>&</span> ${invitation.brideName}</h1>
              </div>
            </div>

            <!-- 메인 콘텐츠 -->
            <div class="invitation-main">
              <!-- 날짜/시간 -->
              <section class="section-datetime scroll-reveal">
                <div class="calendar-date">
                  <div class="calendar-header">${monthYear}</div>
                  <div class="calendar-grid">
                    ${this.generateCalendarGrid(dateObj, dayOfMonth)}
                  </div>
                  <div class="calendar-footer">${this.getDayName(dateObj)}</div>
                </div>
                <div class="datetime-item scroll-reveal-item">
                  <span class="label">시간</span>
                  <span class="value">${invitation.time}</span>
                </div>
              </section>

              <!-- 장소 -->
              <section class="section-location scroll-reveal">
                <h3>오시는 길</h3>
                <div class="location-info">
                  <p class="hall-name">${invitation.location}</p>
                  <p class="address">${invitation.address}</p>
                  <p class="phone">${invitation.phone}</p>
                </div>
                <div class="location-map">
                  <div id="map-${invitation.id}" class="naver-map" style="width: 100%; height: 200px;"></div>
                  <div class="map-buttons">
                    <a href="https://map.naver.com/v5/search/${encodeURIComponent(invitation.address)}" 
                       target="_blank" 
                       class="map-link">
                      📍 네이버 지도에서 위치 보기
                    </a>
                    <a href="https://map.naver.com/v5/directions/${encodeURIComponent(invitation.address)}" 
                       target="_blank" 
                       class="map-link map-link-secondary">
                      🗺️ 길찾기
                    </a>
                  </div>
                </div>
              </section>

              <!-- 메시지 -->
              <section class="section-message scroll-reveal">
                ${invitation.quote ? `<p class="quote-text">"${invitation.quote}"</p>` : ''}
                <p class="message-text">"${invitation.message}"</p>
              </section>

              <!-- 갤러리 (있을 경우) -->
              ${invitation.images.length > 0 ? `
                <section class="section-gallery scroll-reveal">
                  <div class="gallery">
                    ${invitation.images.filter(img => img !== invitation.mainImage).map(img => `
                      <img src="${img}" alt="웨딩 사진">
                    `).join('')}
                  </div>
                </section>
              ` : ''}
              <!-- 댓글 -->
              <section class="section-comments scroll-reveal">
                <h3>축하 메시지</h3>
                <div class="comments-list" id="comments-list-${invitation.id}">
                  ${invitation.comments.map(comment => `
                    <div class="comment-item" data-comment-id="${comment.id}">
                      <div class="comment-header">
                        <span class="comment-author">${comment.author}</span>
                        <span class="comment-date">${this.formatCommentDate(comment.createdAt)}</span>
                      </div>
                      <div class="comment-content">${comment.content}</div>
                    </div>
                  `).join('')}
                </div>
                <div class="comment-form">
                  <input type="text" id="comment-author-${invitation.id}" placeholder="이름" class="comment-input">
                  <textarea id="comment-content-${invitation.id}" placeholder="축하 메시지를 남겨주세요" class="comment-textarea" rows="3"></textarea>
                  <button id="submit-comment-${invitation.id}" class="btn btn-primary comment-submit">메시지 남기기</button>
                </div>
              </section>
              <!-- 푸터 -->
              <section class="section-footer">
                <p>저희 결혼식에 참석해 주셔서 감사입니다</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    `

    container.querySelector('#btn-back')?.addEventListener('click', () => {
      this.options.onBack()
    })

    // ScrollReveal 애니메이션 초기화
    this.initScrollReveal(container)

    // 네이버 지도 초기화
    setTimeout(() => {
      this.initNaverMap(invitation)
    }, 100)

    // 댓글 이벤트 리스너
    this.initCommentEvents(container, invitation)
  }

  private initScrollReveal(container: HTMLElement): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })

    container.querySelectorAll('.scroll-reveal').forEach(el => {
      observer.observe(el)
    })
  }

  private formatMonthYear(date: Date): string {
    const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
    return `${months[date.getMonth()]} ${date.getFullYear()}`
  }

  private getDayName(date: Date): string {
    const days = ['일', '월', '화', '수', '목', '금', '토']
    return days[date.getDay()] + '요일'
  }

  private generateCalendarGrid(dateObj: Date, weddingDay: number): string {
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth()
    
    // 해당 월의 첫째 날과 마지막 날
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const totalDays = lastDay.getDate()
    
    // 첫째 날의 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)
    const startDayOfWeek = firstDay.getDay()
    
    // 요일 헤더
    const weekdays = ['일', '월', '화', '수', '목', '금', '토']
    let html = '<div class="calendar-weekdays">'
    weekdays.forEach(day => {
      html += `<div class="weekday">${day}</div>`
    })
    html += '</div>'
    
    // 날짜 그리드
    html += '<div class="calendar-days">'
    
    // 빈 칸 채우기 (첫째 날 전까지)
    for (let i = 0; i < startDayOfWeek; i++) {
      html += '<div class="calendar-day empty"></div>'
    }
    
    // 날짜 채우기
    for (let day = 1; day <= totalDays; day++) {
      const isWeddingDay = day === weddingDay
      const isToday = new Date().getDate() === day && 
                     new Date().getMonth() === month && 
                     new Date().getFullYear() === year
      const classes = ['calendar-day']
      if (isWeddingDay) classes.push('wedding-day')
      if (isToday) classes.push('today')
      
      html += `<div class="${classes.join(' ')}">${day}</div>`
    }
    
    html += '</div>'
    return html
  }

  private initCommentEvents(container: HTMLElement, invitation: Invitation): void {
    const submitBtn = container.querySelector(`#submit-comment-${invitation.id}`) as HTMLButtonElement
    const authorInput = container.querySelector(`#comment-author-${invitation.id}`) as HTMLInputElement
    const contentTextarea = container.querySelector(`#comment-content-${invitation.id}`) as HTMLTextAreaElement

    submitBtn?.addEventListener('click', () => {
      const author = authorInput.value.trim()
      const content = contentTextarea.value.trim()

      if (!author || !content) {
        alert('이름과 메시지를 모두 입력해주세요.')
        return
      }

      // 댓글 추가
      StorageManager.addComment(invitation.id, { author: author, content: content })

      // 입력 필드 초기화
      authorInput.value = ''
      contentTextarea.value = ''

      // 댓글 목록 업데이트
      this.updateCommentsList(container, invitation)
    })
  }

  private updateCommentsList(container: HTMLElement, invitation: Invitation): void {
    const commentsList = container.querySelector(`#comments-list-${invitation.id}`)
    if (commentsList) {
      commentsList.innerHTML = invitation.comments.map(comment => `
        <div class="comment-item" data-comment-id="${comment.id}">
          <div class="comment-header">
            <span class="comment-author">${comment.author}</span>
            <span class="comment-date">${this.formatCommentDate(comment.createdAt)}</span>
          </div>
          <div class="comment-content">${comment.content}</div>
        </div>
      `).join('')
    }
  }

  private formatCommentDate(dateString: string): string {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return '오늘'
    } else if (diffDays === 1) {
      return '어제'
    } else if (diffDays < 7) {
      return `${diffDays}일 전`
    } else {
      return date.toLocaleDateString('ko-KR')
    }
  }

  private initNaverMap(invitation: Invitation): void {
    const mapElement = document.getElementById(`map-${invitation.id}`)
    if (!mapElement || typeof window.naver === 'undefined') return

    try {
      // 기본 위치 설정 (서울 시청)
      const defaultLat = 37.5665
      const defaultLng = 126.9780

      const mapOptions = {
        center: new window.naver.maps.LatLng(defaultLat, defaultLng),
        zoom: 15,
        mapTypeControl: false,
        mapTypeControlOptions: {
          style: window.naver.maps.MapTypeControlStyle.BUTTON,
          position: window.naver.maps.Position.TOP_RIGHT
        },
        zoomControl: true,
        zoomControlOptions: {
          style: window.naver.maps.ZoomControlStyle.SMALL,
          position: window.naver.maps.Position.TOP_LEFT
        }
      }

      const map = new window.naver.maps.Map(mapElement, mapOptions)

      // 주소로 좌표 검색 (실제로는 Geocoding API 필요)
      // 임시로 기본 위치에 마커 표시
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(defaultLat, defaultLng),
        map: map,
        title: invitation.location
      })

      // 정보창
      const infoWindow = new window.naver.maps.InfoWindow({
        content: `<div style="padding: 10px; font-size: 12px;">
          <strong>${invitation.location}</strong><br>
          ${invitation.address}
        </div>`
      })

      window.naver.maps.Event.addListener(marker, 'click', () => {
        if (infoWindow.getMap()) {
          infoWindow.close()
        } else {
          infoWindow.open(map, marker)
        }
      })

    } catch (error) {
      console.warn('네이버 지도 초기화 실패:', error)
      // 지도 초기화 실패 시 링크만 표시
      mapElement.style.display = 'none'
    }
  }
}
