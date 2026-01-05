import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import styles from './ChatBox.module.scss';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const FE_BASE_URL = 'http://localhost:5173';

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const mapApiMessageToUi = (apiMsg) => {
    return {
      id: apiMsg.id || Date.now(),
      content: apiMsg.message,
      sender: apiMsg.senderType === 'USER' ? 'user' : 'bot',
      createdAt: apiMsg.createdAt
    };
  };

  const fetchChatHistory = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/chat/history`, {
        withCredentials: true
      });

      if (response.data.success && Array.isArray(response.data.data)) {
        const formattedMessages = response.data.data.map(mapApiMessageToUi);
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error("Lỗi lấy lịch sử chat:", error);
    }
  };

  const sendMessageToApi = async (messageContent) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/chat/send`,
        { message: messageContent },
        { withCredentials: true }
      );

      if (response.data.success && response.data.data) {
        return mapApiMessageToUi(response.data.data);
      }
      return null;
    } catch (error) {
      console.error("Lỗi gửi tin nhắn:", error);
      return {
        id: Date.now(),
        content: "Xin lỗi, hệ thống đang bận. Vui lòng thử lại sau.",
        sender: 'bot'
      };
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      fetchChatHistory();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isBotTyping]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    const userText = inputValue;
    setInputValue("");

    const tempUserMsg = {
      id: Date.now(),
      content: userText,
      sender: 'user',
    };
    setMessages((prev) => [...prev, tempUserMsg]);

    setIsBotTyping(true);

    const botReplyMsg = await sendMessageToApi(userText);

    setIsBotTyping(false);
    
    if (botReplyMsg) {
      setMessages((prev) => [...prev, botReplyMsg]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const renderMessageContent = (content) => {
    if (content.startsWith('tim-viec-lam') || content.startsWith('http')) {
      const fullUrl = content.startsWith('http') ? content : `${FE_BASE_URL}/${content}`;
      
      return (
        <div className={styles.jobResultCard}>
          <p>Tôi đã tìm thấy công việc phù hợp với yêu cầu của bạn:</p>
          <a href={fullUrl} target="_blank" rel="noopener noreferrer" className={styles.generatedLink}>
             👉 Xem danh sách việc làm ngay
          </a>
        </div>
      );
    }
    return <span>{content}</span>;
  };

  return (
    <div className={styles.chatWidget}>
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.header}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className={styles.avatarBot}>🤖</div>
              <div>
                <h3>AI Tìm Việc</h3>
                <span className={styles.status}>Online</span>
              </div>
            </div>
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
              &times;
            </button>
          </div>

          <div className={styles.messagesBody}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`${styles.message} ${styles[msg.sender]}`}
              >
                {renderMessageContent(msg.content)}
              </div>
            ))}
            
            {isBotTyping && (
              <div className={`${styles.message} ${styles.bot} ${styles.typing}`}>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.footer}>
            <input
              type="text"
              placeholder="Nhập yêu cầu tìm việc (ví dụ: lương 15tr)..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button 
              className={styles.sendBtn} 
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isBotTyping}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      )}

      <button className={styles.toggleBtn} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default ChatBox;