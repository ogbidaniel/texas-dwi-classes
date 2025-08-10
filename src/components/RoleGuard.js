import { useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../pages/_app';

export function withRoleGuard(WrappedComponent, allowedRoles) {
  return function RoleGuard(props) {
    const { user } = useContext(AuthContext);
    const router = useRouter();

    if (!user || !allowedRoles.includes(user.role)) {
      router.push('/unauthorized');
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}