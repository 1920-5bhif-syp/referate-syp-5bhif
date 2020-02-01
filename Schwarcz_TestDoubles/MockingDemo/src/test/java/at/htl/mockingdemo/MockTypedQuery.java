package at.htl.mockingdemo;

import at.htl.mockingdemo.model.Address;
import at.htl.mockingdemo.model.Person;
import org.mockito.Mock;

import javax.persistence.*;
import java.util.*;

@io.quarkus.test.Mock
public class MockTypedQuery<T> implements TypedQuery<T> {

    @Mock
    Address address;

    @Override
    public List<T> getResultList() {
        ArrayList<T> resultList = new ArrayList<T>();
        resultList.add((T)new Person("Mockey", "Mouse", address));
        return resultList;
    }

    @Override
    public T getSingleResult() {
        return null;
    }

    @Override
    public int executeUpdate() {
        return 0;
    }

    @Override
    public TypedQuery<T> setMaxResults(int i) {
        return null;
    }

    @Override
    public int getMaxResults() {
        return 0;
    }

    @Override
    public TypedQuery<T> setFirstResult(int i) {
        return null;
    }

    @Override
    public int getFirstResult() {
        return 0;
    }

    @Override
    public TypedQuery<T> setHint(String s, Object o) {
        return null;
    }

    @Override
    public Map<String, Object> getHints() {
        return null;
    }

    @Override
    public <T1> TypedQuery<T> setParameter(Parameter<T1> parameter, T1 t1) {
        return null;
    }

    @Override
    public TypedQuery<T> setParameter(Parameter<Calendar> parameter, Calendar calendar, TemporalType temporalType) {
        return null;
    }

    @Override
    public TypedQuery<T> setParameter(Parameter<Date> parameter, Date date, TemporalType temporalType) {
        return null;
    }

    @Override
    public TypedQuery<T> setParameter(String s, Object o) {
        return null;
    }

    @Override
    public TypedQuery<T> setParameter(String s, Calendar calendar, TemporalType temporalType) {
        return null;
    }

    @Override
    public TypedQuery<T> setParameter(String s, Date date, TemporalType temporalType) {
        return null;
    }

    @Override
    public TypedQuery<T> setParameter(int i, Object o) {
        return null;
    }

    @Override
    public TypedQuery<T> setParameter(int i, Calendar calendar, TemporalType temporalType) {
        return null;
    }

    @Override
    public TypedQuery<T> setParameter(int i, Date date, TemporalType temporalType) {
        return null;
    }

    @Override
    public Set<Parameter<?>> getParameters() {
        return null;
    }

    @Override
    public Parameter<?> getParameter(String s) {
        return null;
    }

    @Override
    public <T> Parameter<T> getParameter(String s, Class<T> aClass) {
        return null;
    }

    @Override
    public Parameter<?> getParameter(int i) {
        return null;
    }

    @Override
    public <T> Parameter<T> getParameter(int i, Class<T> aClass) {
        return null;
    }

    @Override
    public boolean isBound(Parameter<?> parameter) {
        return false;
    }

    @Override
    public <T> T getParameterValue(Parameter<T> parameter) {
        return null;
    }

    @Override
    public Object getParameterValue(String s) {
        return null;
    }

    @Override
    public Object getParameterValue(int i) {
        return null;
    }

    @Override
    public TypedQuery<T> setFlushMode(FlushModeType flushModeType) {
        return null;
    }

    @Override
    public FlushModeType getFlushMode() {
        return null;
    }

    @Override
    public TypedQuery<T> setLockMode(LockModeType lockModeType) {
        return null;
    }

    @Override
    public LockModeType getLockMode() {
        return null;
    }

    @Override
    public <T> T unwrap(Class<T> aClass) {
        return null;
    }
}
