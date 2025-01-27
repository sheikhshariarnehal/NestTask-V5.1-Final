import { useState } from 'react';
import { Users, UserCheck, Clock } from 'lucide-react';
import { Card } from '../ui/card';
import { ActiveUsersModal } from './stats/ActiveUsersModal';
import { UserDetailsModal } from './stats/UserDetailsModal';
import type { User } from '../../types/auth';
import type { UserStats as UserStatsType } from '../../types/stats';

interface UserStatsProps {
  users: User[];
  stats: UserStatsType;
}

export function UserStats({ users, stats }: UserStatsProps) {
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showActiveUsers, setShowActiveUsers] = useState<'active' | 'new' | null>(
    null
  );

  const getActiveUsers = () => {
    const now = new Date();
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);
    
    return users.filter(user => {
      if (!user.lastActive) return false;
      const lastActiveDate = new Date(user.lastActive);
      return lastActiveDate >= startOfToday;
    });
  };

  const getNewUsers = () => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return users.filter(user => new Date(user.createdAt) >= weekAgo);
  };

  const activeUsers = getActiveUsers();
  const newUsers = getNewUsers();

  const statCards = [
    {
      title: 'Total Users',
      value: users.length,
      icon: Users,
      color: 'blue' as const,
      onClick: () => setShowUserDetails(true)
    },
    {
      title: 'Active Today',
      value: activeUsers.length,
      icon: UserCheck,
      color: 'green' as const,
      onClick: () => setShowActiveUsers('active')
    },
    {
      title: 'New This Week',
      value: newUsers.length,
      icon: Clock,
      color: 'purple' as const,
      onClick: () => setShowActiveUsers('new')
    }
  ];

  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        {statCards.map(({ title, value, icon: Icon, color, onClick }) => (
          <Card
            key={title}
            className="p-4 cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={onClick}
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-2 bg-${color}-50 dark:bg-${color}-900/20 rounded-lg`}
              >
                <Icon
                  className={`w-5 h-5 text-${color}-600 dark:text-${color}-400`}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {title}
                </p>
                <p className="text-2xl font-semibold">{value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {showUserDetails && (
        <UserDetailsModal users={users} onClose={() => setShowUserDetails(false)} />
      )}

      {showActiveUsers && (
        <ActiveUsersModal
          users={showActiveUsers === 'active' ? activeUsers : newUsers}
          type={showActiveUsers}
          onClose={() => setShowActiveUsers(null)}
        />
      )}
    </>
  );
}
