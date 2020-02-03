package at.htl.mockingdemo.model;

public class Address {

    private int zipCode;
    private String name;

    //region Constructors

    public Address() {
    }

    public Address(int zipCode, String name) {
        this.zipCode = zipCode;
        this.name = name;
    }

    //endregion

    //region Getter and Setter

    public int getZipCode() {
        return zipCode;
    }

    public void setZipCode(int zipCode) {
        this.zipCode = zipCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    //endregion

}
