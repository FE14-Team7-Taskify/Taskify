import DashboardCards from './components/DashboardCards';
import InvitationTable from './components/InvitationsTable';
import styles from './styles/mydashboard.module.scss';

export default function MyDashBoard() {
  return (
    <div className={styles.container}>
      <DashboardCards />
      <InvitationTable />
    </div>
  );
}
