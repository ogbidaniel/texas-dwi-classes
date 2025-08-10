import { useRouter } from 'next/router';
import { useEffect } from 'react';
import VideoConferenceInterface from '../../components/VideoConferenceInterface';

export default function ClassRoom() {
  const router = useRouter();
  const { id } = router.query;

  // Add authentication check
  useEffect(() => {
    // TODO: Replace with actual auth check
    const isAuthenticated = true; // This should check your auth state
    const hasClassAccess = true; // This should verify if user is enrolled

    if (!isAuthenticated || !hasClassAccess) {
      router.push('/account');
    }
  }, [router]);

  if (!id) return null;

  return <VideoConferenceInterface classId={id} />;
}