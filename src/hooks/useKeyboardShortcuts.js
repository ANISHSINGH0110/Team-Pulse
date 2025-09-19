import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { switchRole } from '../redux/slices/roleSlice';
import { updateMemberStatus } from '../redux/slices/membersSlice';

export const useKeyboardShortcuts = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.role);
  const { teamMembers } = useSelector(state => state.members);

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Only trigger if not typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      if (e.ctrlKey || e.metaKey) {
        switch(e.key.toLowerCase()) {
          case 'r':
            e.preventDefault();
            dispatch(switchRole());
            break;
          case '1':
            e.preventDefault();
            updateCurrentUserStatus('Working');
            break;
          case '2':
            e.preventDefault();
            updateCurrentUserStatus('Break');
            break;
          case '3':
            e.preventDefault();
            updateCurrentUserStatus('Meeting');
            break;
          case '4':
            e.preventDefault();
            updateCurrentUserStatus('Offline');
            break;
        }
      }
    };

    const updateCurrentUserStatus = (status) => {
      const currentMember = teamMembers.find(member => member.name === currentUser);
      if (currentMember) {
        dispatch(updateMemberStatus({
          memberId: currentMember.id,
          status
        }));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [dispatch, currentUser, teamMembers]);
};