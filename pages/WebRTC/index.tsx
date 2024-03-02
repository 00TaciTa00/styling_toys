import { useState, useEffect } from "react";
import { Socket, io } from "socket.io-client";
import Peer from "simple-peer";
import styles from "./WebRTC.module.css";
import { useRouter } from "next/router";
import io from "socket.io-client";
import Peer from "simple-peer";
import styles from "./WebRTC.module.css";

interface PeerData {
  peerId: string;
  peer: Peer.Instance;
}

type sockeType = Socket;

export default function WebRTC() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [peers, setPeers] = useState<PeerData[]>([]);
  const [socket, setSocket] = useState<sockeType | null>(null);
  const [videoCallActive, setVideoCallActive] = useState<boolean>(false);
  const router = useRouter();


  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);

        newSocket.emit("join", null);

        newSocket.on("user-joined", (userId, signal) => {
          connectToNewUser({ signal, callerId: userId });
        });

        newSocket.on("user-disconnected", (userId) => {
          const peerObj = peers.find((peer) => peer.peerId === userId);
          if (peerObj) {
            peerObj.peer.destroy();
            setPeers((prevPeers) =>
              prevPeers.filter((peer) => peer.peerId !== userId)
            );
          }
        });
      });

    return () => {
      newSocket.disconnect();
    };
  }, [peers]);

  function createPeer(
    userToSignal: string,
    callerId: string,
    stream: MediaStream
  ) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal: any) => {
      socket!.emit("sending-signal", { userToSignal, callerId, signal });
    });

    return peer;
  }

  function addPeer(
    incomingSignal: Peer.SignalData,
    callerId: string,
    stream: MediaStream
  ) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal: any) => {
      socket!.emit("returning-signal", { signal, callerId });
    });

    peer.signal(incomingSignal);
    return peer;
  }

  function connectToNewUser({
    signal,
    callerId,
  }: {
    signal: Peer.SignalData;
    callerId: string;
  }) {
    const peer = addPeer(signal, callerId, stream!);
    setPeers((prevPeers) => [...prevPeers, { peerId: callerId, peer }]);
  }

  function toggleVideoCall() {
    if (videoCallActive) {
      // 화상 통화 중지 로직
      setVideoCallActive(false);
      // 피어 종료 등 추가적인 로직 구현
    } else {
      // 화상 통화 시작 로직
      setVideoCallActive(true);
      // 피어 생성 등 추가적인 로직 구현
    }
  }

  return (
    <div>
      <div className={styles.title}>
        <h1>WebRTC Video Chat</h1>
        <button onClick={() => router.push("/")}>To main</button>
      </div>
      <div className={styles.videoGrid}>
        <div className={styles.myVideo}>
          {stream && (
            <video
              muted
              playsInline
              ref={(ref) => ref && (ref.srcObject = stream)}
              autoPlay
            />
          )}
        </div>
        {peers.map((peer) => (
          <div key={peer.peerId} className={styles.peerVideo}>
            <video
              playsInline
              ref={(ref) =>
                ref && peer.peer && (ref.srcObject = peer.peer.stream)
              }
              autoPlay
            />
          </div>
        ))}
      </div>
      <button onClick={toggleVideoCall}>
        {videoCallActive ? "End Video Call" : "Start Video Call"}
      </button>
    </div>
  );
}
