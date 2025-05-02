import DashboardCardList from './components/DashboardCardList';
import InvitationTable from './components/InvitationsTable';
import styles from './styles/mydashboard.module.scss';

export default function MyDashBoard() {
  return (
    <div className={styles.container}>
      <DashboardCardList />
      <InvitationTable />
    </div>
  );
}
