import io.agroal.api.AgroalDataSource;
import io.quarkus.test.junit.QuarkusTest;
import org.assertj.db.type.Changes;
import org.assertj.db.type.Table;
import org.flywaydb.core.Flyway;
import org.jooq.*;
import org.jooq.impl.DSL;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import javax.inject.Inject;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

import static at.htl.jooq.db.Tables.*;
import static org.assertj.db.api.Assertions.assertThat;


@QuarkusTest
public class JooqTest {

    @Inject
    AgroalDataSource dataSource;

    @Inject
    Flyway flyway;

    private Connection conn;
    private DSLContext create;

    @BeforeEach
    public void setup() throws SQLException {

        conn = dataSource.getConnection();
        create = DSL.using(conn);

        flyway.clean();
        flyway.migrate();
    }

    @AfterEach
    public void tearDown() throws SQLException {
        create.close();
        conn.close();
    }

    @Test
    public void test1() {
        Result<?> result = create.select(SALGRADE.GRADE).from(SALGRADE).fetch();

        System.out.println(result.get(0).getValue(SALGRADE.GRADE));

        Table testTable = new Table(dataSource, SALGRADE.getName(), new Table.Order[]{
                Table.Order.asc(SALGRADE.GRADE.getName())
        });

        assertThat(testTable).column(SALGRADE.GRADE.getName())
                .value().isEqualTo(1)
                .value().isEqualTo(2)
                .value().isEqualTo(3)
                .value().isEqualTo(4)
                .value().isEqualTo(5);
    }

    @Test
    public void test2() {

        Changes changes = new Changes(dataSource);

        create.insertInto(DEPT).values(60, "TEST2", "TEST2").execute();

        changes.setStartPointNow();

        create.insertInto(DEPT).values(50, "TEST", "TEST").execute();
        create.update(DEPT).set(DEPT.DNAME, "TEST1").where(DEPT.DEPTNO.eq((byte) 40)).execute();
        create.delete(DEPT).where(DEPT.DEPTNO.eq((byte) 60)).execute();


        changes.setEndPointNow();

        assertThat(changes).hasNumberOfChanges(3)
                .ofCreation().hasNumberOfChanges(1)
                .ofDeletion().hasNumberOfChanges(1)
                .ofModification().hasNumberOfChanges(1)
                .ofAll().hasNumberOfChanges(3);
                //.onTable("members").hasNumberOfChanges(2)
                //.ofCreationOnTable("albums").hasNumberOfChanges(0);
    }

    @Test
    public void test3() {

        for(TableField field : EMP.getPrimaryKey().getFields()){
            field.getName();
        }

        EMP.getReferences();

    }

}
