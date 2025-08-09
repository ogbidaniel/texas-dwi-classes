import { useState, useRef, useEffect } from 'react';
import OpenAI from 'openai';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MessageCircle,
  Hand,
  Monitor,
  Phone,
  Users,
  MoreVertical,
  Settings,
  Send,
  Smile,
  Camera
} from 'lucide-react';

const VideoConferenceInterface = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [chatMessage, setChatMessage] = useState('');
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [sidebarMode, setSidebarMode] = useState('participants');
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  
  // Simplified participants array with just AI and current user
  const [participants] = useState([
    { 
      id: 1, 
      name: 'DWI Education Instructor', 
      isHost: true, 
      isMuted: false, 
      isVideoOn: true, 
      isAI: true,
      license: 'TDLR #982'
    },
    { 
      id: 2, 
      name: 'You', 
      isHost: false, 
      isMuted: false, 
      isVideoOn: true, 
      isAI: false 
    }
  ]);

  // Start with empty messages array
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize OpenAI client
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true // Note: In production, use server-side API calls
  });

  const generateAIResponse = async (userMessage) => {
    try {
      setIsLoading(true);
      
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an AI instructor teaching a Texas DWI class. Keep responses concise, professional, and educational. Focus on DWI laws, safety, and prevention."
          },
          {
            role: "user",
            content: userMessage
          }
        ],
        max_tokens: 150
      });

      const aiMessage = {
        id: messages.length + 2,
        sender: 'AI Assistant',
        message: response.choices[0].message.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAI: true
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      // Add error message to chat
      const errorMessage = {
        id: messages.length + 2,
        sender: 'AI Assistant',
        message: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAI: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Update handleSendMessage to use AI response
  const handleSendMessage = async () => {
    if (chatMessage.trim()) {
      const userMessage = {
        id: messages.length + 1,
        sender: 'You',
        message: chatMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAI: false
      };
      setMessages(prev => [...prev, userMessage]);
      const messageText = chatMessage;
      setChatMessage('');
      
      // Generate AI response
      await generateAIResponse(messageText);
    }
  };

  // Update header content
  const Header = () => (
    <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-lg font-semibold text-gray-800">
          DWI Education of SE Texas - Online Session
        </h1>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Live</span>
          <span>•</span>
          <span>{participants.length} participants</span>
          <span>•</span>
          <span className="text-blue-600">TDLR License #982</span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Settings size={18} className="text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <MoreVertical size={18} className="text-gray-600" />
        </button>
      </div>
    </div>
  );

  // Update ParticipantVideo component to show TDLR license for AI
  const ParticipantVideo = ({ participant, isMain = false }) => (
    <div className={`relative bg-gray-900 rounded-lg overflow-hidden ${
      isMain ? 'aspect-video w-full' : 'aspect-video'
    } ${participant.isAI ? 'ring-2 ring-blue-400' : ''}`}>
      {participant.isVideoOn && !participant.isAI ? (
        <video
          ref={participant.name === 'You' ? videoRef : null}
          autoPlay
          muted={participant.name === 'You'}
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        <div className={`w-full h-full flex items-center justify-center text-white ${
          participant.isAI ? 'bg-gradient-to-br from-blue-600 to-purple-700' : 'bg-gradient-to-br from-gray-600 to-gray-800'
        }`}>
          <div className="text-center">
            {participant.isAI ? (
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-white/20 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-blue-400 animate-pulse"></div>
              </div>
            ) : (
              <Camera size={isMain ? 48 : 32} className="mx-auto mb-2 opacity-60" />
            )}
            <p className={`${isMain ? 'text-lg' : 'text-sm'} font-medium`}>
              {participant.name}
              {participant.isAI && <span className="ml-2 text-xs bg-blue-500 px-2 py-1 rounded">AI</span>}
            </p>
          </div>
        </div>
      )}
      
      {/* Participant controls */}
      <div className="absolute bottom-2 left-2 flex space-x-1">
        {participant.isMuted && (
          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <MicOff size={12} className="text-white" />
          </div>
        )}
        {participant.isHost && (
          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">H</span>
          </div>
        )}
      </div>
      
      {/* Speaking indicator */}
      {!participant.isMuted && participant.isAI && (
        <div className="absolute top-2 left-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      )}

      {/* Add TDLR license for AI instructor */}
      {participant.isAI && (
        <div className="absolute top-2 right-2 bg-blue-600 px-2 py-1 rounded text-xs text-white">
          {participant.license}
        </div>
      )}
    </div>
  );

  // Add useEffect for handling media devices
  useEffect(() => {
    const initializeMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error('Error accessing media devices:', err);
        setError('Unable to access camera or microphone');
      }
    };

    initializeMedia();

    // Cleanup function
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Update the mic toggle function
  const toggleMicrophone = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isMuted;
        setIsMuted(!isMuted);
      }
    }
  };

  // Update the video toggle function
  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoOff;
        setIsVideoOff(!isVideoOff);
      }
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex">
      <div className="flex-1 flex flex-col h-screen">
        <Header />
        
        {/* Main content */}
        <div className="flex-1 p-4 flex items-center justify-center">
          <div className="w-full max-w-4xl">
            <ParticipantVideo participant={participants[0]} isMain={true} />
          </div>
        </div>

        {/* Controls bar - Update the chat button to toggle sidebar mode */}
        <div className="bg-gray-800 px-4 py-4 flex items-center justify-center space-x-4 sticky bottom-0 z-50">
          <button
            onClick={toggleMicrophone}
            className={`p-3 rounded-full transition-colors ${
              isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-600 hover:bg-gray-700'
            }`}
          >
            {isMuted ? <MicOff size={20} className="text-white" /> : <Mic size={20} className="text-white" />}
          </button>
          
          <button
            onClick={toggleVideo}
            className={`p-3 rounded-full transition-colors ${
              isVideoOff ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-600 hover:bg-gray-700'
            }`}
          >
            {isVideoOff ? <VideoOff size={20} className="text-white" /> : <Video size={20} className="text-white" />}
          </button>
          
          <button
            onClick={() => setIsHandRaised(!isHandRaised)}
            className={`p-3 rounded-full transition-colors ${
              isHandRaised ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-600 hover:bg-gray-700'
            }`}
          >
            <Hand size={20} className="text-white" />
          </button>
          
          <button className="p-3 rounded-full bg-gray-600 hover:bg-gray-700">
            <Monitor size={20} className="text-white" />
          </button>
          
          <button
            onClick={() => setSidebarMode(sidebarMode === 'chat' ? 'participants' : 'chat')}
            className={`p-3 rounded-full transition-colors ${
              sidebarMode === 'chat' ? 'bg-blue-600' : 'bg-gray-600 hover:bg-gray-700'
            } relative`}
          >
            {sidebarMode === 'chat' ? (
              <Users size={20} className="text-white" />
            ) : (
              <MessageCircle size={20} className="text-white" />
            )}
            {sidebarMode !== 'chat' && messages.length > 0 && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            )}
          </button>

          <button className="p-3 rounded-full bg-red-500 hover:bg-red-600 ml-4">
            <Phone size={20} className="text-white" />
          </button>
        </div>
      </div>

      {/* Sidebar - Now toggles between chat and participants */}
      <div className="w-80 bg-white border-l flex flex-col">
        {/* Sidebar header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {sidebarMode === 'chat' ? (
              <>
                <MessageCircle size={18} className="text-blue-600" />
                <h3 className="font-semibold text-gray-800">Chat</h3>
              </>
            ) : (
              <>
                <Users size={18} className="text-blue-600" />
                <h3 className="font-semibold text-gray-800">Participants ({participants.length})</h3>
              </>
            )}
          </div>
          <button
            onClick={() => setSidebarMode(sidebarMode === 'chat' ? 'participants' : 'chat')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {sidebarMode === 'chat' ? (
              <Users size={18} className="text-gray-600" />
            ) : (
              <MessageCircle size={18} className="text-gray-600" />
            )}
          </button>
        </div>

        {/* Sidebar content */}
        {sidebarMode === 'chat' ? (
          <>
            {/* Empty chat state */}
            {messages.length === 0 && (
              <div className="flex-1 flex items-center justify-center text-center p-4 text-gray-500">
                <div>
                  <MessageCircle size={40} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Welcome to DWI Education of SE Texas.</p>
                  <p className="text-xs mt-1">Start your conversation with the instructor.</p>
                </div>
              </div>
            )}
            
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map(message => (
                <div key={message.id} className="text-sm">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`font-medium text-xs ${
                      message.isAI ? 'text-blue-600' : 'text-gray-700'
                    }`}>
                      {message.sender}
                    </span>
                    <span className="text-xs text-gray-500">{message.timestamp}</span>
                  </div>
                  <div className={`p-2 rounded-lg ${
                    message.isAI 
                      ? 'bg-blue-50 text-blue-900 border-l-2 border-blue-400' 
                      : 'bg-gray-50 text-gray-800'
                  }`}>
                    {message.message}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Chat input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                  placeholder={isLoading ? "AI is typing..." : "Type a message to the AI..."}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!chatMessage.trim() || isLoading}
                  className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 rounded-lg transition-colors"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send size={16} className="text-white" />
                  )}
                </button>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <button className="text-xs text-gray-500 hover:text-gray-700 flex items-center space-x-1">
                  <Smile size={14} />
                  <span>React</span>
                </button>
                <span className="text-xs text-gray-400">Press Enter to send</span>
              </div>
            </div>
          </>
        ) : (
          /* Participant thumbnails - only show current user */
          <div className="flex-1 overflow-y-auto p-2">
            <div className="space-y-2">
              {participants.slice(1).map(participant => (
                <div key={participant.id} className="w-full">
                  <ParticipantVideo participant={participant} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoConferenceInterface;