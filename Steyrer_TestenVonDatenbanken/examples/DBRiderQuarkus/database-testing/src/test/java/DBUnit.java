import com.github.database.rider.core.api.connection.ConnectionHolder;
import com.github.database.rider.core.api.dataset.DataSet;
import com.github.database.rider.core.api.dataset.DataSetFormat;
import com.github.database.rider.core.api.dataset.ExpectedDataSet;
import com.github.database.rider.core.api.exporter.ExportDataSet;
import com.github.database.rider.junit5.DBUnitExtension;
import com.google.common.collect.Tables;
import io.agroal.api.AgroalDataSource;
import io.quarkus.test.junit.QuarkusTest;
import org.assertj.core.api.Fail;
import org.assertj.db.type.Request;
import org.assertj.db.type.Table;
import org.flywaydb.core.Flyway;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import javax.inject.Inject;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.db.api.Assertions.assertThat;
import static org.assertj.db.output.Outputs.output;

@QuarkusTest
@ExtendWith({DBUnitExtension.class})
public class DBUnit {

    @Inject
    AgroalDataSource dataSource;

    private ConnectionHolder connectionHolder = () -> dataSource.getConnection();

    private static boolean initialized = false;
    private static Connection connection;


    //Export DataSet from Database
    @Test
    @ExportDataSet(format = DataSetFormat.YML,outputName="src/test/resources/output/allTables.yml")
    public void shouldExportAllTablesInYMLFormat() {

    }

    @BeforeEach
    public void tearUp() {
        if (!initialized) {
            try {
                connection = dataSource.getConnection();
            } catch (SQLException e) {
                System.out.println(e.getClass().getSimpleName() + ": " + e.getMessage());
            }
            initialized = true;
        }
    }

    @AfterAll
    public static void tearDown(){
        try {
            connection.close();
        } catch (SQLException e) {
            System.out.println(e.getClass().getSimpleName() + ": " + e.getMessage());
        }
    }


    @Test
    @DataSet("empty.yml") //load Database State from file (Before Unit Test) [Files in resources/datasets]
    @ExpectedDataSet(value = "empty.yml") //Assert That Database State is expected DataSet (After Unit Test)
    public void empty() {
        //do unit test
    }


    @Test
    public void test01TablesExists(){

        assertThat(tableExists("dept")).isTrue();
        assertThat(tableExists("dummy")).isTrue();
        assertThat(tableExists("emp")).isTrue();
        assertThat(tableExists("salgrade")).isTrue();
    }

    @Test
    public void test02TableDeptMetaData(){

        Table dept = new Table(dataSource, "dept");
        output(dept).toConsole();
        Set<String> expectedPrimaryKeys = new HashSet<>();;
        expectedPrimaryKeys.add("deptno");

        List<String> expectedColumnTypes = new LinkedList<>();;
        expectedColumnTypes.add("2");
        expectedColumnTypes.add("12");
        expectedColumnTypes.add("12");

        List<String> expectedColumnIsNullableValues = new LinkedList<>();;
        expectedColumnIsNullableValues.add("NO");
        expectedColumnIsNullableValues.add("YES");
        expectedColumnIsNullableValues.add("YES");

        assertThat(getPrimaryKeys("dept")).isEqualTo(expectedPrimaryKeys);
        assertThat(dept)
                .hasNumberOfColumns(3)
                .column().hasColumnName("deptno")
                .column().hasColumnName("dname")
                .column().hasColumnName("loc");

        assertThat(getColumnTypes("dept")).isEqualTo(expectedColumnTypes);
        assertThat(getColumnIsNullableValues("dept")).isEqualTo(expectedColumnIsNullableValues);

    }

    @Test
    public void test03TableEmpMetaData(){

        Table emp = new Table(dataSource, "emp");
        output(emp).toConsole();
        Set<String> expected = new HashSet<>();;
        expected.add("empno");

        assertThat(getPrimaryKeys("emp")).isEqualTo(expected);
        assertThat(emp)
                .hasNumberOfColumns(8)
                .column().hasColumnName("empno")
                .column().hasColumnName("ename")
                .column().hasColumnName("job")
                .column().hasColumnName("mgr")
                .column().hasColumnName("hiredate")
                .column().hasColumnName("sal")
                .column().hasColumnName("comm")
                .column().hasColumnName("deptno");
    }

    @Test
    public void test04TableSalgradeMetaData(){

        Table salgrade = new Table(dataSource, "salgrade");
        Set<String> expected = new HashSet<>();;
        expected.add("grade");
        assertThat(getPrimaryKeys("salgrade")).isEqualTo(expected);
        assertThat(salgrade)
                .hasNumberOfColumns(3)
                .column().hasColumnName("grade")
                .column().hasColumnName("losal")
                .column().hasColumnName("hisal");

    }

    @Test
    public void test05TableDummyMetaData(){

        Table dummy = new Table(dataSource, "dummy");
        Set<String> expected = new HashSet<>();;
        expected.add("dummy");

        assertThat(getPrimaryKeys("dummy")).isEqualTo(expected);
        assertThat(dummy).column().hasColumnName("dummy");

    }

    @Test
    @DataSet(value = {"emp.yml", "dept.yml"}, disableConstraints = true)
    public void test06TableEmpData(){

        Table emp = new Table(dataSource, "emp", new Table.Order[] {
                Table.Order.asc("empno")
        });
        output(emp).toConsole();

        assertThat(emp)
                .row().hasValues(7369, "SMITH", "CLERK", 7902, "1980-12-17", 800.00, null, 20)
                .row().hasValues(7499, "ALLEN", "SALESMAN", 7698, "1981-02-20", 1600.00, 300.00, 30);
    }

    @Test
    @DataSet("dept.yml")
    @ExpectedDataSet("dept.yml")
    public void test07TableDeptData(){

        Table dept = new Table(dataSource, "dept", new Table.Order[] {
                Table.Order.asc("deptno")
        });
        output(dept).toConsole();

        assertThat(dept)
                .row().hasValues(10, "ACCOUNTING", "NEW YORK")
                .row().hasValues(20, "RESEARCH", "DALLAS");

    }

    @Test
    @DataSet("salgrade.yml")
    public void test08TableSalgradeData(){

        Table salgrade = new Table(dataSource, "salgrade", new Table.Order[] {
                Table.Order.asc("grade")
        });
        output(salgrade).toConsole();

        assertThat(salgrade)
                .row().hasValues(1, 700, 1200)
                .row().hasValues(2, 1201, 1400);
    }

    @Test
    @DataSet("dummy.yml")
    public void test09TableDummyData(){

        Table dummy = new Table(dataSource, "dummy", new Table.Order[] {
                Table.Order.asc("grade")
        });
        output(dummy).toConsole();
        assertThat(dummy)
                .row().hasValues(0);
    }


    private boolean tableExists(String tableName){
        boolean exists = false;

        try(ResultSet rs = connection.getMetaData().getTables(null, null, tableName, null)) {
            if (rs.next()) {
                exists = true; // table exists
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return exists;
    }

    private Set<String> getPrimaryKeys(String tableName){
        Set<String> pks = new HashSet<>();
        try (ResultSet result = connection.getMetaData().getPrimaryKeys(null,null, tableName);) {
            while(result.next())
            {
                String columnName = result.getString(4);
                pks.add(columnName);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return pks;
    }

    private List<String> getColumnTypes(String tableName){
        List<String> types = new LinkedList<>();

        try(ResultSet columns = connection.getMetaData().getColumns(null,null, tableName, null);) {
            while (columns.next()) {
                String columnName = columns.getString("COLUMN_NAME");
                String datatype = columns.getString("DATA_TYPE");
                String columnsize = columns.getString("COLUMN_SIZE");
                String decimaldigits = columns.getString("DECIMAL_DIGITS");
                String isNullable = columns.getString("IS_NULLABLE");
                String is_autoIncrment = columns.getString("IS_AUTOINCREMENT");
                //Printing results
                System.out.println(columnName + "---" + datatype + "---" + columnsize + "---" + decimaldigits + "---" + isNullable + "---" + is_autoIncrment);

                types.add(datatype);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return types;
    }

    private List<String> getColumnIsNullableValues(String tableName){
        List<String> values = new LinkedList<>();

        try(ResultSet columns = connection.getMetaData().getColumns(null,null, tableName, null);) {
            while (columns.next()) {
                String isNullable = columns.getString("IS_NULLABLE");

                values.add(isNullable);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return values;
    }



}
